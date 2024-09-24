def pass_one():
    locctr = start = 0
    label = opcode = operand = ""

    # Open necessary files
    fp1 = open('input.txt', 'r')
    fp2 = open('optab.txt', 'r')
    fp3 = open('symtab.txt', 'w')
    fp4 = open('intermediate.txt', 'w')
    fp5 = open('length.txt', 'w')

    # Read the first line of input file
    line = fp1.readline().strip()
    parts = line.split()

    if len(parts) == 3:
        label, opcode, operand = parts
    elif len(parts) == 2:
        label = "**"  # No label on this line
        opcode, operand = parts
    elif len(parts) == 1:
        opcode = parts[0]
        label, operand = "**", "**"
    else:
        print(f"Error: Invalid format in input file. Line: {line}")
        return

    # START directive handling
    if opcode == "START":
        start = int(operand, 16)  # Treat start as a hex value
        locctr = start
        fp4.write(f"\t{label}\t{opcode}\t{operand}\n")  # No locctr for START
        line = fp1.readline().strip()
        parts = line.split()
        if len(parts) == 3:
            label, opcode, operand = parts
        elif len(parts) == 2:
            label = "**"
            opcode, operand = parts
        elif len(parts) == 1:
            opcode = parts[0]
            label, operand = "**", "**"
    else:
        locctr = 0

    # Pass 1 processing
    while opcode != "END":
        # Write locctr and line to intermediate file
        fp4.write(f"{hex(locctr)[2:].upper()}\t{label}\t{opcode}\t{operand}\n")

        # Add label to symbol table if it's not empty or "**"
        if label != "**" and label.strip():
            fp3.write(f"{label}\t{hex(locctr)[2:].upper()}\n")

        # Reset optab file pointer to search for opcode
        fp2.seek(0)
        code = mnemonic = ""
        found_opcode = False

        for line in fp2:
            code, mnemonic = line.strip().split()
            if opcode == code:
                locctr += 3  # Instructions occupy 3 bytes
                found_opcode = True
                break

        if not found_opcode:
            if opcode == "WORD":
                locctr += 3
            elif opcode == "RESW":
                locctr += 3 * int(operand)  # RESW reserves words (3 bytes each)
            elif opcode == "BYTE":
                if operand.startswith("C'"):
                    locctr += len(operand) - 3  # Each character is 1 byte
                elif operand.startswith("X'"):
                    locctr += (len(operand) - 3) // 2  # Each pair of hex digits is 1 byte
            elif opcode == "RESB":
                locctr += int(operand)  # RESB reserves bytes

        # Read the next line from input
        line = fp1.readline().strip()
        if line:
            parts = line.split()
            if len(parts) == 3:
                label, opcode, operand = parts
            elif len(parts) == 2:
                label = "**"
                opcode, operand = parts
            elif len(parts) == 1:
                opcode = parts[0]
                label, operand = "**", "**"

    # Write final END line to intermediate file
    fp4.write(f"{hex(locctr)[2:].upper()}\t{label}\t{opcode}\t{operand}\n")

    # Calculate and save program length
    length = locctr - start
    fp5.write(f"{hex(length)[2:].upper()}\n")
    print(f"\nThe length of the code: {hex(length)[2:].upper()}\n")

    # Close all files
    fp1.close()
    fp2.close()
    fp3.close()
    fp4.close()
    fp5.close()



def pass_two():
    # Open necessary files
    fp1 = open('intermediate.txt', 'r')
    fp2 = open('optab.txt', 'r')
    fp3 = open('symtab.txt', 'r')
    fp4 = open('objectcode.txt', 'w')

    symtab = {}

    # Read the symbol table into a dictionary
    for line in fp3:
        parts = line.strip().split()
        if len(parts) == 2:
            symtab[parts[0]] = parts[1]

    # Read intermediate file line by line
    for line in fp1:
        line = line.strip()
        if not line:  # Ignore empty lines
            continue

        parts = line.split()

        if len(parts) == 4:  # format: locctr label opcode operand
            locctr, label, opcode, operand = parts
        elif len(parts) == 3:  # format: locctr ** opcode operand
            locctr, opcode, operand = parts
            label = "**"
        else:
            print(f"Error in format for line: {line}")
            continue

        # Lookup opcode in optab
        fp2.seek(0)
        found_opcode = False
        machine_code = ""
        for optab_line in fp2:
            optab_parts = optab_line.strip().split()
            if len(optab_parts) == 2 and opcode == optab_parts[0]:
                machine_code = optab_parts[1]
                found_opcode = True
                break

        if found_opcode:
            # If operand is a symbol, fetch its address from symtab
            if operand in symtab:
                machine_code += symtab[operand]
            else:
                machine_code += "0000"  # Undefined symbol or no operand

        elif opcode == "WORD":
            # WORD stores a 3-byte constant
            machine_code = f"{int(operand):06X}"

        elif opcode == "BYTE":
            # BYTE can be either a character constant (C'EOF') or hex constant (X'F1')
            if operand.startswith("C'") and operand.endswith("'"):
                machine_code = ''.join(f"{ord(c):02X}" for c in operand[2:-1])
            elif operand.startswith("X'") and operand.endswith("'"):
                machine_code = operand[2:-1]  # Just take the hex digits as machine code

        elif opcode == "RESW" or opcode == "RESB":
            # RESW or RESB does not produce machine code, so leave blank
            machine_code = ""

        else:
            print(f"Undefined opcode: {opcode}")
            continue

        # Write machine code to object file
        if machine_code:
            fp4.write(f"{locctr}\t{machine_code}\n")

    # Close all files
    fp1.close()
    fp2.close()
    fp3.close()
    fp4.close()

    print("\nPass 2 completed. Object code generated in 'objectcode.txt'.")


def display_pass1_output():
    with open('input.txt', 'r') as fp1:
        print("\nThe contents of Input Table:\n")
        print(fp1.read())

    with open('intermediate.txt', 'r') as fp2:
        print("\nThe contents of Intermediate Table:\n")
        print(fp2.read())

    with open('symtab.txt', 'r') as fp3:
        print("\nThe contents of Symbol Table:\n")
        print(fp3.read())


def display_pass2_output():
    with open('objectcode.txt', 'r') as fp4:
        print("\nThe contents of Object Code Table:\n")
        print(fp4.read())


def read_output(file_path):
    try:
        with open(file_path, 'r') as file:
            return file.read()
    except FileNotFoundError:
        return "File not found."


if __name__ == "__main__":
    pass_one()              # Run Pass 1
    display_pass1_output()   # Display results of Pass 1
    pass_two()               # Run Pass 2
    display_pass2_output()   # Display results of Pass 2
