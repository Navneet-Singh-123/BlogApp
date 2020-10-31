import {Environment} from './env'

export const DevEnvironment: Environment = {
    db_url: 'mongodb+srv://<username>:<password>@cluster0.ajit1.mongodb.net/<dbname>?retryWrites=true&w=majority', 
    jwt_secret: '######'
}