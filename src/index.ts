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

async function createApplication(token: string): Promise<string> {
	const response = await fetch(`${BASE_URL}/job-application-request/`, {
		method: 'POST',
		headers: {
			'Authorization': `Token ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: process.env.EMAIL,
			first_name: 'Anas',
			last_name: 'Elidrissi',
		}),
	});

	const data = await response.json();

	if (!response.ok || !data.url) {
		throw new Error(`❌ Application creation failed: ${response.status} - ${JSON.stringify(data)}`);
	}

	console.log('✅ Application created');
	return data.url;
}

async function waitForCompletion(token: string, statusUrl: string): Promise<string> {
	const maxAttempts = 15;
	const interval = 2000;

	for (let i = 0; i < maxAttempts; i++) {
		const response = await fetch(statusUrl, {
			headers: {
				Authorization: `Token ${token}`
			}
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(`❌ Failed to poll status: ${response.status} - ${JSON.stringify(data)}`);
		}

		console.log(`⏳ Status check (${i + 1}/${maxAttempts}):`, data.status);

		if (data.status === 'COMPLETED' && data.confirmation_url) {
			console.log('✅ Status is COMPLETED');
			return data.confirmation_url;
		}

		await new Promise(resolve => setTimeout(resolve, interval));
	}

	throw new Error('❌ Timeout: status did not reach COMPLETED');
}

async function confirmApplication(token: string, confirmationUrl: string): Promise<void> {
	const response = await fetch(confirmationUrl, {
		method: 'PATCH',
		headers: {
			'Authorization': `Token ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			confirmed: true,
		}),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`❌ Confirmation failed: ${response.status} - ${error}`);
	}

	console.log('✅ Application confirmed');
}

async function main() {
	try {
		const token = await login();
		const applicationUrl = await createApplication(token);
		console.log('📄 Application status URL:', applicationUrl);

		const confirmationUrl = await waitForCompletion(token, applicationUrl);
		console.log('✅ Confirmation URL:', confirmationUrl);

		await confirmApplication(token, confirmationUrl);
	} catch (err) {
		console.error(err);
	}
}

main();
