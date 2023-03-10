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

Add server environment variables
| Mac/Linux | Windows |
| --- | --- |
| `touch .env` | ` type  nul > .env` |

Add required environment variables from [.env.example](https://github.com/COSC484-Project-Group-3/LostAndFound/blob/main/server/.env.example) to `.env`.

Run the server
```bash
  npm start
```
