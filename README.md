# Simple Queue

This is a simple queue management system implemented in Node.js with TypeScript, Express, and PostgreSQL.

## Installation

Before running the application, make sure you have Node.js and Yarn installed on your machine.

1. Clone this repository:

   ```bash
   git clone https://github.com/LexxXell/simple-queue.git
   ```

2. Navigate to the project folder:

   ```bash
   cd simple-queue
   ```

3. Install dependencies:

   ```bash
   yarn
   ```

4. Create a `.env` file based on the provided `.env.example` and update it with your PostgreSQL database configuration.

5. Run the migration to set up the database:

   ```bash
   yarn migrate
   ```

## Usage

To start the application, run:

```bash
yarn start
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Development

For development, you can use the following command, which compiles TypeScript and starts the application:

```bash
yarn dev
```

## Docker Compose

To run the application using Docker Compose, you can use the provided scripts:

- Start containers:

  ```bash
  yarn docker-compose-up
  ```

- Start containers in the background:

  ```bash
  yarn docker-compose-up-d
  ```

- Stop containers:

  ```bash
  yarn docker-compose-down
  ```

- Stop containers and remove volumes:

  ```bash
  yarn docker-compose-down-v
  ```

Make sure to adjust the PostgreSQL configuration in the `.env` file before running Docker Compose.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
