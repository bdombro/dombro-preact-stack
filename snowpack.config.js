/** @type {import("snowpack").SnowpackUserConfig } */

const nonRouteExtensions = 'js|css|ico|png|jpg|svg|json|map|txt|woff|woff2|tff|pdf'

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	mount: {
		public: {url: '/', static: true},
		src: {url: '/dist'},
	},
	plugins: [
		[
			'@snowpack/plugin-typescript',
			{
				/* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
				...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
			},
		],
		'@prefresh/snowpack', // This is known to sometimes conflict with preact.context
		['snowpack-plugin-hash',{ hashLength: 4,logLevel: 'error' }], // fails when Leaflet is in public/lib folder
	],
	routes: [
		/* Enable an SPA Fallback in development: */
		// {"match": "routes", "src": ".*", "dest": "/index.html"},
		// The recommend approach (above) doesn't work for deep routes for some reason
		{'match': 'all', 'src': `^(.(?!\.(${nonRouteExtensions})$))+$`, 'dest': '/index.html'},
	],
	optimize: {
		bundle: isProd,
		// minify: true, // sourcemaps dont work in minify yet :-(
		// splitting: true, // app breaks with splitting
		manifest: true,
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		output: 'stream',
		port: 3000,
	},
	buildOptions: {
		/* ... */
		sourcemap: !isProd,
	},
	alias: {
		'#src': './src',
		'#lib': './src/lib',
		'#lay': './src/layout',
	}
}
