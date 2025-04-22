import subprocess

def run_docker_commands():
    try:
        # Commands to run
        commands = [
            ["python", "manage.py", "machinewise"],
            ["python", "manage.py", "andon10"],
            ["python", "manage.py", "andon9"],
            # Add more commands as needed
        ]

        # Run the commands
        for command in commands:
            subprocess.run(command, check=True)

    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
    except Exception as ex:
        print(f"An unexpected error occurred: {ex}")

if __name__ == "__main__":
    run_docker_commands()
