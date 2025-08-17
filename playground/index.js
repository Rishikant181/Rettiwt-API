import { Rettiwt } from '../dist/index.js';
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

async function testTweetDetail() {
	try {
		console.log('\n=== Testing Custom Detail Method ===');
		
		const response = await rettiwt.tweet.tweetDetail('1950175414040645998');
		
		console.log('Custom detail - Raw response received');
		console.log('Response structure:', Object.keys(response));
		
		if (response.data) {
			console.log('Data keys:', Object.keys(response.data));
			
			// If threaded_conversation_with_injections_v2 exists, display its structure
			if (response.data.threaded_conversation_with_injections_v2) {
				const conversation = response.data.threaded_conversation_with_injections_v2;
				console.log('Conversation instructions count:', conversation.instructions?.length || 0);
			}
		}
		
		return response;
	} catch (error) {
		console.error('Error in custom detail method:', error);
		return null;
	}
}

// Run all tests
console.log('Starting tests...\n');

await userDetails();
console.log('\n' + '='.repeat(50) + '\n');

const customDetails = await testTweetDetail();
console.log('Custom detail result:', customDetails);
