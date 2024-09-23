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

    while opcode != "END":
        # Write to intermediate file
        fp4.write(f"{hex(locctr)[2:].upper()}\t{label}\t{opcode}\t{operand}\n")

        # Add label to symbol table only if it is not "**"
        if label != "**" and label.strip():  # Check if label is not empty or just whitespace
            fp3.write(f"{label}\t{hex(locctr)[2:].upper()}\n")

        # Check for opcode in optab
        fp2.seek(0)
        code = mnemonic = ""
        found_opcode = False
        for line in fp2:
            code, mnemonic = line.strip().split()
            if opcode == code:
                locctr += 3  # Increment by 3 for instructions
                found_opcode = True
                break

        # Check for other opcodes
        if not found_opcode:
            if opcode == "WORD":
                locctr += 3
            elif opcode == "RESW":
                locctr += 3 * int(operand)  # RESW reserves words (3 bytes each)
            elif opcode == "BYTE":
                locctr += 1  # Increment by 1 for BYTE
            elif opcode == "RESB":
                locctr += int(operand)  # RESB reserves bytes

        # Read next line from input
        line = fp1.readline().strip()
        if line:  # Ensure the line is not empty
            parts = line.split()
            if len(parts) == 3:
                label, opcode, operand = parts
            elif len(parts) == 2:
                label = "**"
                opcode, operand = parts
            elif len(parts) == 1:
                opcode = parts[0]
                label, operand = "**", "**"

    # Write final line to intermediate file
    fp4.write(f"{hex(locctr)[2:].upper()}\t{label}\t{opcode}\t{operand}\n")

    # Calculate and save program length
    length = locctr - start
    fp5.write(f"{hex(length)[2:].upper()}\n")
    print(f"\nThe length of the code: {hex(length)[2:].upper()}\n")

    # Close files
    fp1.close()
    fp2.close()
    fp3.close()
    fp4.close()
    fp5.close()


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


if __name__ == "__main__":
    pass_one()
    display_pass1_output()