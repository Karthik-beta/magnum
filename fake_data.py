import psycopg2
import faker
import time
import datetime
import random

# Database credentials
DB_NAME = "shind"
DB_USER = "postgres" 
DB_PASSWORD = "password123"  
DB_HOST = "localhost"  
DB_PORT = "5432"  

# Table name
TABLE_NAME = "production_andon"

# Faker instance
fake = faker.Faker()


def get_latest_s_no(conn):
    """
    Retrieves the latest s_no from the database.
    """
    try:
        cur = conn.cursor()
        cur.execute(f"SELECT MAX(s_no) FROM {TABLE_NAME};")
        latest_s_no = cur.fetchone()[0]
        if latest_s_no is None:  # Table is empty
            return 0
        else:
            return latest_s_no
    except Exception as e:
        print(f"Error getting latest s_no: {e}")
        return 0  # Assume 0 if there's an error


def insert_fake_data(conn, next_s_no):
    """
    Inserts a new row with fake data into the database.
    """
    try:
        cur = conn.cursor()

        machine_id = fake.bothify(text='Machine-????')  # Generate a machine ID like Machine-1234
        machine_datetime = datetime.datetime.now()
        r = random.choice(['R', 'I'])  # Random status
        p = random.randint(10, 100)  # Random production value
        # kwh_reading = round(random.uniform(0.1, 10.0), 2)  # Random kWh reading
        kwh_reading = None

        sql = f"""
            INSERT INTO {TABLE_NAME} (s_no, machine_id, machine_datetime, r, p, kwh_reading)
            VALUES (%s, %s, %s, %s, %s, %s);
        """
        cur.execute(sql, (next_s_no, machine_id, machine_datetime, r, p, kwh_reading))
        conn.commit()
        print(f"Inserted record with s_no: {next_s_no}")

    except Exception as e:
        print(f"Error inserting data: {e}")
        conn.rollback()  # Rollback in case of error
    finally:
        cur.close()


def main():
    """
    Main function to connect to the database and insert fake data every 10 seconds.
    """
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.autocommit = False  # Disable autocommit for better control

        s_no = get_latest_s_no(conn)
        next_s_no = s_no + 1 if s_no is not None else 1


        while True:
            insert_fake_data(conn, next_s_no)
            next_s_no += 1
            time.sleep(1)  # Wait for 1 seconds

    except psycopg2.Error as e:
        print(f"Database connection error: {e}")
    except KeyboardInterrupt:
        print("Script interrupted. Closing connection...")
    finally:
        if conn:
            conn.close()
            print("Database connection closed.")


if __name__ == "__main__":
    main()