# LostAndFound

The Lost and Found Web Application is designed to solve the problem of lost personal items by providing a platform where users can post information about their lost items and connect with others who may have found them. 

## Installation

To Run `LostAndFound` Locally:

Download:\
[Git](https://git-scm.com/)\
[Node](https://nodejs.org/en/)

Clone the repository
```bash
  git clone https://github.com/COSC484-Project-Group-3/LostAndFound.git

```

Install server dependencies
```bash
  cd LostAndFound/server
  npm install
```

Add server environment variables in `server` folder
| Mac/Linux | Windows |
| --- | --- |
| `touch .env` | ` type  nul > .env` |

Add required environment variables from [.env.example](https://github.com/COSC484-Project-Group-3/LostAndFound/blob/main/server/.env.example) to `.env`.\

```bash
MONGO_URI=
PORT=
```

Run the server
```bash
  npm start
```

Install client dependencies
```bash
  cd LostAndFound/client
  npm install
```

Add server environment variables in `client` folder
```bash
  cd client
```

| Mac/Linux | Windows |
| --- | --- |
| `touch .env` | ` type  nul > .env` |

Add required environment variables from [.env.example](https://github.com/COSC484-Project-Group-3/LostAndFound/blob/main/client/.env.example) to `.env`.

```bash
REACT_APP_API_URL=
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_GOOGLE_CLIENT_SECRET=
```

Run the client
```bash
  npm start
```
