from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from passpy import pass_one, pass_two

app = Flask(__name__)
CORS(app)  # Enable CORS for React app

UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_files():
    input_file = request.files['inputFile']
    optab_file = request.files['optabFile']
    intermediate_file = open(os.path.join(UPLOAD_FOLDER, 'intermediate.txt'), 'w')
    symtab_file = open(os.path.join(UPLOAD_FOLDER, 'symtab.txt'), 'w')
    length_file = open(os.path.join(UPLOAD_FOLDER, 'length.txt'), 'w')
    objectcode_file = open(os.path.join(UPLOAD_FOLDER, 'objectcode.txt'), 'w')
    record_file=open(os.path.join(UPLOAD_FOLDER,'record.txt'),'w')

    # Save uploaded files
    input_file.save(os.path.join(UPLOAD_FOLDER, 'input.txt'))
    optab_file.save(os.path.join(UPLOAD_FOLDER, 'optab.txt'))

    # Run Pass 1
    pass_one(os.path.join(UPLOAD_FOLDER, 'input.txt'),
             os.path.join(UPLOAD_FOLDER, 'optab.txt'),
             os.path.join(UPLOAD_FOLDER, 'symtab.txt'),
             os.path.join(UPLOAD_FOLDER, 'intermediate.txt'),
             os.path.join(UPLOAD_FOLDER, 'length.txt'))

    # Run Pass 2
    pass_two(os.path.join(UPLOAD_FOLDER, 'intermediate.txt'),
             os.path.join(UPLOAD_FOLDER, 'optab.txt'),
             os.path.join(UPLOAD_FOLDER, 'symtab.txt'),
             os.path.join(UPLOAD_FOLDER, 'objectcode.txt'),
             os.path.join(UPLOAD_FOLDER,'record.txt'))

    return jsonify({"message": "Files processed successfully"}), 200

@app.route('/pass1-output', methods=['GET'])
def get_pass1_output():
    output = read_output(os.path.join(UPLOAD_FOLDER, 'intermediate.txt'))
    return output, 200

@app.route('/pass2-output', methods=['GET'])
def get_pass2_output():
    output = read_output(os.path.join(UPLOAD_FOLDER, 'objectcode.txt'))
    return output, 200

@app.route('/symtab-output', methods=['GET'])
def get_symtab_output():
    output = read_output(os.path.join(UPLOAD_FOLDER, 'symtab.txt'))
    return output, 200
@app.route('/record-output', methods=['GET'])
def get_record_output():
    output = read_output(os.path.join(UPLOAD_FOLDER,'record.txt'))
    return output, 200
  

def read_output(file_path):
    try:
        with open(file_path, 'r') as file:
            output = file.read()
        return output
    except FileNotFoundError:
        return "File not found."

if __name__ == '__main__':
    app.run(debug=True)
