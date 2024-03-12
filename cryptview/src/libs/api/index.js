const uri = "https://api.binance.us/api/";

const api = {
	baseURL: uri,
	get: async (url, options) => {
		options = {
			...options,
			method: "GET"
		};
		return await api.fetch(url, options);
	},
	post: async (url, options) => {
		options = {
			...options,
			method: "POST"
		};
		return await api.fetch(url, options)
	},
	delete: async (url, options) => {
		options = {
			...options,
			method: "DELETE"
		};
		return await api.fetch(url, options)
	},
	update: async (url, options) => {
		options = {
			...options,
			method: "UPDATE"
		};
		return await api.fetch(url, options)
	},
	fetch: async (url, inputOptions) => {

		const opts = {
			...inputOptions,
			method: inputOptions?.method || 'GET',
			headers: {
				...inputOptions?.headers
			}
		}

		// if(opts.signedEndpoint)
		// {
		// 	inputOptions.body = {
		// 		...inputOptions.body,
		// 		apiKey: process.env.API_KEY,
		// 		secretKey: process.env.API_SECRET
		// 	}
		// }

		const ContentType = "Content-Type";

		if (inputOptions.headers && inputOptions.headers[ContentType]) {
			opts.headers = {
				...opts.headers,
				"Content-Type": inputOptions.headers[ContentType]
			}
		}

		if (opts.body && opts.headers[ContentType] === "application/json") {
			opts.body = JSON.stringify(inputOptions.body);
		}

		const fullUrl = api.baseURL + url;

		if (url.charAt(0) === '/') {
			url = url.slice(1, url.length);
		}

		if (process.env.NODE_ENV === "development")
		{
			let logString = "running method: " + opts.method + " on " + fullUrl;
			if (opts.headers) {
				logString += " with headers: {\n";
				for (var header in opts.headers) {
					logString += "\t\t" + header + ": " + opts.headers[header] + "\n";
				}
				logString += "\t}";
			}
			
			console.info(logString);
		}

		return await fetch(fullUrl, opts);
	}
}

export default api;
