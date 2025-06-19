import 'dotenv/config';

const BASE_URL = 'https://hire-game.pertimm.dev/api/v1.1';

async function register() {
	const response = await fetch(`${BASE_URL}/auth/register/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: process.env.EMAIL,
			password1: process.env.PASSWORD,
			password2: process.env.PASSWORD
		}),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`❌ Registration failed: ${response.status} - ${error}`);
	}

	console.log('✅ Registration successful');
}

async function login(): Promise<string> {
	const response = await fetch(`${BASE_URL}/auth/login/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: process.env.EMAIL,
			password: process.env.PASSWORD,
		}),
	});

	const data = await response.json();

	if (!response.ok || !data.token) {
		throw new Error(`❌ Login failed: ${response.status} - ${JSON.stringify(data)}`);
	}

	console.log('✅ Login successful');
	return data.token;
}

async function main() {
	try {
		const token = await login();
		console.log('🔐 Token:', token);
	} catch (err) {
		console.error(err);
	}
}

main();
