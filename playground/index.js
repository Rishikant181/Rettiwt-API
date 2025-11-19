import { Rettiwt } from 'rettiwt-api';
import 'dotenv/config';

const rettiwt = new Rettiwt({ apiKey: process.env.ACCESS_TOKEN });

async function userDetails() {
	try {
		const user = await rettiwt.user.details();
		console.log(user);
	} catch (error) {
		console.error('Error fetching user details:', error);
	}
}

await userDetails();
