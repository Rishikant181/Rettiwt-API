/* eslint-disable @typescript-eslint/naming-convention */

export interface IXChatPublicKeysResponse {
	data?: { user_results_by_rest_ids?: IXChatPublicKeyUserResult[] };
}

export interface IXChatPublicKeyUserResult {
	rest_id?: string;
	result?: { get_public_keys?: { public_keys_with_token_map?: IXChatPublicKeyRecord[] } };
}

export interface IXChatPublicKeyRecord {
	public_key_with_metadata?: {
		version?: string;
		public_key?: {
			public_key?: string;
			signing_public_key?: string;
			identity_public_key_signature?: string;
		};
	};
	token_map?: {
		key_store_token_map_json?: string;
		token_map?: Array<{ key?: string; value?: { token?: string } }>;
	};
}
