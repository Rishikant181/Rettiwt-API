import {TweetService} from "../../../services/DataServices/TweetService"
import { UID } from "../types/uidModel"
import { config } from "../../../config/env";

var fetchTweets=new TweetService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie'])


