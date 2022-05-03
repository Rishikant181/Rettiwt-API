// CUSTOM LIBS

// TYPES
import { LoginFlow } from '../../types/Authentication';

/**
 * @summary Stores the different flows involved in login process
 */
export enum LoginFlows {
    Login = "Login",
    LoginJsInstrumentationSubtask = "LoginJsInstrumentationSubtask",
    LoginEnterUserIdentifierSSOSubtask = "LoginEnterUserIdentifierSSOSubtask",
    LoginEnterAlternateIdentifierSubtask = "LoginEnterAlternateIdentifierSubtask",
    LoginEnterPassword = "LoginEnterPassword",
    AccountDuplicationCheck = "AccountDuplicationCheck",
};

/**
 * @summary Store the body content of the different HTTP request for each flow in login process
 */
const LoginFlowsContent = {
    "Login": {
        "url": 'https://twitter.com/i/api/1.1/onboarding/task.json?flow_name=login',
        "body": '{"input_flow_data":{"flow_context":{"debug_overrides":{},"start_location":{"location":"splash_screen"}}},"subtask_versions":{"contacts_live_sync_permission_prompt":0,"email_verification":1,"topics_selector":1,"wait_spinner":1,"cta":4}}'
    },
    "LoginJsInstrumentationSubtask": {
        "url": 'https://twitter.com/i/api/1.1/onboarding/task.json',
        "body": '{"flow_token":"<flow_token>","subtask_inputs":[{"subtask_id":"LoginJsInstrumentationSubtask","js_instrumentation":{"response":"{\\"rf\\":{\\"f3d0013d2401a9e86a63dac052aeec19524813e572f0b446241b550bc1e653e8\\":-146,\\"abef77ded0018c5ef4a2146465e76811c8ee7a377ff84c2181e58ac7e5bb8b97\\":-17,\\"a6d95f40b2cc05ac2baa2ce64ce976d3558cd9ca79a3e1ae797d3bda62847470\\":112,\\"ae30e4310433b0ae4e670acd918eebd0056daee600fa9db57082e8ace2c2fb1c\\":14},\\"s\\":\\"AR1nIiYWWtrhpM2n5cu-WDC77syV8L_zqLIHxmAePc0nhZAnrh3WdNig2MMFoIk-k1TjxWijXgVtjbLaYB-gTFA9KigwnaVsno0o6deCU1b_uH3XxKCRwaE-KN3c65PXRKNJP08YB1nQENeFXgM9MsrywIO0C60zGlPWj8XlB9sAICGoJ26OJ7IgvMZP_5VgIJZwMDpJx3gN4xhI44n32TiLxerU59vDbwltkf0rgsIL34PODWWDOt9m07jrFaPFkt40T_G0sWJhuy9xfEWetgOmMLnQCpn4Ut6kl_W9Yi6wNDH1vtnRMbgeKgaJJRv2cTIvOa9DBvYV63cp_3G9WQAAAYBLmqMB\\"}","link":"next_link"}}]}'
    },
    "LoginEnterUserIdentifierSSOSubtask": {
        "url": 'https://twitter.com/i/api/1.1/onboarding/task.json',
        "body": '{"flow_token":"<flow_token>","subtask_inputs":[{"subtask_id":"LoginEnterUserIdentifierSSOSubtask","settings_list":{"setting_responses":[{"key":"user_identifier","response_data":{"text_data":{"result":"<email>"}}}],"link":"next_link"}}]}'
    },
    "LoginEnterAlternateIdentifierSubtask": {
        "url": 'https://twitter.com/i/api/1.1/onboarding/task.json',
        "body": '{"flow_token":"<flow_token>","subtask_inputs":[{"subtask_id":"LoginEnterAlternateIdentifierSubtask","enter_text":{"text":"<user_name>","link":"next_link"}}]}'
    },
    "LoginEnterPassword": {
        "url": 'https://twitter.com/i/api/1.1/onboarding/task.json',
        "body": '{"flow_token":"<flow_token>","subtask_inputs":[{"subtask_id":"LoginEnterPassword","enter_password":{"password":"<password>","link":"next_link"}}]}'
    },
    "AccountDuplicationCheck": {
        "url": 'https://twitter.com/i/api/1.1/onboarding/task.json',
        "body": '{"flow_token":"<flow_token>","subtask_inputs":[{"subtask_id":"AccountDuplicationCheck","check_logged_in_account":{"link":"AccountDuplicationCheck_false"}}]}'
    }
};

/**
 * @returns The login flow body content for the required login flow
 * @param email The email of the account to be logged into
 * @param userName The username of the account to be logged into
 * @param password The password to the account to be logged into
 * @param flowToken The flow token from the previous flow
 * @param flowName The required flow name
 */
export function generateLoginFlow(
    email: string,
    userName: string,
    password: string,
    flowToken: string,
    flowName: LoginFlows
): LoginFlow {
    // Getting the requested flow
    var flow = LoginFlowsContent[flowName];

    // Replacing the provided values into the flow body
    flow['body'] = flow['body'].replace("<flow_token>", flowToken);
    flow['body'] = flow['body'].replace("<email>", email);
    flow['body'] = flow['body'].replace("<user_name>", userName);
    flow['body'] = flow['body'].replace("<password>", password);

    flow['body'] = flow['body'];

    return flow;
}