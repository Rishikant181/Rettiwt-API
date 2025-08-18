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

async function testBulkTweetDetail() {
	try {
		console.log('\n=== Testing Bulk Tweet Detail Method ===');
		
		// Test multiple tweet IDs
		const tweetIds = ['1950175414040645998', '1956690447167815829', '1956690447167815830'];
		
		console.log('Testing with tweet IDs:', tweetIds);
		
		const response = await rettiwt.tweet.bulkTweetDetail(tweetIds);
		
		console.log('Bulk tweet detail - Raw response received');
		console.log('Response structure:', Object.keys(response));
		
		if (response.data) {
			console.log('Data keys:', Object.keys(response.data));
			
			// If threaded_conversation_with_injections_v2 exists, display its structure
			if (response.data.threaded_conversation_with_injections_v2) {
				const conversation = response.data.threaded_conversation_with_injections_v2;
				console.log('Conversation instructions count:', conversation.instructions?.length || 0);
				
				// Display the type of each instruction
				if (conversation.instructions && conversation.instructions.length > 0) {
					console.log('Instruction types:');
					conversation.instructions.forEach((instruction, index) => {
						console.log(`  ${index + 1}. Type: ${instruction.type}`);
						if (instruction.entries) {
							console.log(`     Entries count: ${instruction.entries.length}`);
						}
					});
				}
			}
		}
		
		return response;
	} catch (error) {
		console.error('Error in bulk tweet detail method:', error);
		return null;
	}
}

// Run all tests
console.log('Starting tests...\n');

// await userDetails();
// console.log('\n' + '='.repeat(50) + '\n');

const customDetails = await testTweetDetail();
console.log('Custom detail result:', customDetails);

console.log('\n' + '='.repeat(50) + '\n');

const bulkDetails = await testBulkTweetDetail();
console.log('Bulk detail result:', JSON.stringify(bulkDetails));
