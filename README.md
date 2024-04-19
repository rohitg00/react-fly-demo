<h1 align="center">Cerbos React Demo</h1>

<p align="center">
  React-based web application that uses Cerbos for smooth authorization.
</p>

## Introduction

This is a React-based web application that provides a platform for users to view and manage courses. The application uses Cerbos for authorization.

## Tech Stack

- [React](https://react.dev/) – library for building UI
- [Cerbos](https://www.cerbos.dev/) – Authorization Service
- [Node.js](https://nodejs.org/) – JavaScript runtime
- [docker](https://www.docker.com/) - Containerization platform  
- [Git](https://git-scm.com/) – versioning
- [pnpm](https://pnpm.io/) – efficient package manager

## Local Development

0.  **Prerequisites**

    Make sure you have the following installed on your machine:

    - [Git](https://git-scm.com/)
    - [Node.js](https://nodejs.org/en)
    - [pnpm](https://pnpm.io/)
    - [docker](https://www.docker.com/)

1.  **Clone the repository:**

	```bash
	git clone https://github.com/rohitg00/cerbos-react-demo.git
	```

2.  **Start up the Cerbos PDP instance docker container:**

	```bash
 	chmod +x ./cerbos/start.sh

	./cerbos/start.sh
	```
	(This will be called by the React app to check authorization.)

4.  **Navigate to the project directory:**

	```bash
	cd react-app/
	```

5.  **Install dependencies:**

	```bash
	pnpm install
	```

6. Start the development server

	```bash
	pnpm run dev
	```

7. **Open your browser:**

	Visit [http://localhost:5173](http://localhost:5173) to explore the courses application.

6. Use the login credentials provided in the `seed.js` file.

## Contributing

Contributions are always welcome! Feel free to open issues or submit PRs.
