import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Await, Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, data, isRouteErrorResponse, useRouteError } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region ../../node_modules/.bun/@react-router+dev@8.0.1+ee46a16e89085d9f/node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region src/shared/components/error-boundary.tsx
function ErrorBoundary() {
	const error = useRouteError();
	let message = "Error.";
	let details = "No more details.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "This page doesnt exist." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "max-w-337.5 w-full mx-auto mt-20 p-8 space-y-2",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl",
				children: message
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-lg",
				children: details
			}),
			stack
		]
	});
}
//#endregion
//#region src/app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Manrope&display=swap"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Patrona&display=swap"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
//#endregion
//#region src/app/routes/_layout.tsx
var _layout_exports = /* @__PURE__ */ __exportAll({
	default: () => _layout_default,
	meta: () => meta
});
function meta({}) {
	return [{ title: "Website" }, {
		name: "description",
		content: "This is a React Router website."
	}];
}
var _layout_default = UNSAFE_withComponentProps(function Layout() {
	return /* @__PURE__ */ jsx("main", {
		className: "min-h-screen relative",
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
});
//#endregion
//#region src/app/routes/$.tsx
var $_exports$1 = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	default: () => $_default$1,
	loader: () => loader$2
});
async function loader$2() {
	throw data(null, { status: 404 });
}
var $_default$1 = UNSAFE_withComponentProps(function Page() {
	return null;
});
//#endregion
//#region virtual:ladoc:pages
var virtual_ladoc_pages_default = {
	"/folder1": () => import("./assets/_index-DvF6UZWw.js"),
	"/folder1/blabla": () => import("./assets/blabla-7thV6Ugp.js"),
	"/folder1/folder2/xxxx": () => import("./assets/xxxx-CuIN2nMw.js"),
	"/test": () => import("./assets/test-Cvg8htT7.js")
};
//#endregion
//#region src/app/routes/_index.tsx
var _index_exports = /* @__PURE__ */ __exportAll({ default: () => _index_default });
var keys = Object.keys(virtual_ladoc_pages_default);
var values = Object.values(virtual_ladoc_pages_default);
var _index_default = UNSAFE_withComponentProps(function Home() {
	return /* @__PURE__ */ jsxs("main", {
		className: "max-w-337.5 w-full mx-auto mt-20 flex flex-col items-start gap-2",
		children: [
			/* @__PURE__ */ jsx("p", { children: "Hello World :)" }),
			JSON.stringify(keys),
			JSON.stringify(values),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-2 grid-cols-4 w-full",
				children: keys.map((key) => {
					const page = virtual_ladoc_pages_default[key]();
					return /* @__PURE__ */ jsx(Suspense, {
						fallback: /* @__PURE__ */ jsx("p", { children: "Loading." }),
						children: /* @__PURE__ */ jsx(Await, {
							resolve: page,
							children: (value) => {
								return /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col size-full",
									children: [/* @__PURE__ */ jsx("p", {
										className: "bg-emerald-100 rounded-t-sm p-1 text-xs",
										children: key
									}), /* @__PURE__ */ jsx("pre", {
										className: "size-full bg-black text-white w-auto rounded-b-sm font-mono p-2 text-xs",
										children: value.default
									})]
								});
							}
						})
					}, key);
				})
			}),
			/* @__PURE__ */ jsx("p", { children: "TODO: Choper l'arbre des pages" }),
			/* @__PURE__ */ jsx("p", { children: "TODO: Reload quand un fichier ajouté/delete au folder " }),
			/* @__PURE__ */ jsxs("p", { children: ["TODO: Generer un dict ", "{ path : () => @import(virtual:ladoc:filepath) }"] })
		]
	});
});
//#endregion
//#region src/app/routes/documentation/$.tsx
var $_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	default: () => $_default,
	loader: () => loader$1
});
async function loader$1() {
	throw data(null, { status: 404 });
}
var $_default = UNSAFE_withComponentProps(function Page() {
	return null;
});
//#endregion
//#region src/app/routes/llms.txt.tsx
var llms_txt_exports = /* @__PURE__ */ __exportAll({ loader: () => loader });
var loader = async () => {
	return "Hello robot";
};
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-C-w87cuD.js",
		"imports": [
			"/assets/jsx-runtime-WgHwu3Oc.js",
			"/assets/components-CLbfDAG6.js",
			"/assets/preload-helper-CZgWQFsJ.js"
		],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-PcyXOEoR.js",
			"imports": [
				"/assets/jsx-runtime-WgHwu3Oc.js",
				"/assets/components-CLbfDAG6.js",
				"/assets/preload-helper-CZgWQFsJ.js",
				"/assets/error-boundary-D0jX8Rjr.js"
			],
			"css": ["/assets/root-BFjTHUoC.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_layout": {
			"id": "routes/_layout",
			"parentId": "root",
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_layout-wLQFQ5dK.js",
			"imports": ["/assets/jsx-runtime-WgHwu3Oc.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/$": {
			"id": "routes/$",
			"parentId": "routes/_layout",
			"path": "*",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/_-DxYIqTGu.js",
			"imports": ["/assets/jsx-runtime-WgHwu3Oc.js", "/assets/error-boundary-D0jX8Rjr.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_index": {
			"id": "routes/_index",
			"parentId": "routes/_layout",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_index-D0gM3rbc.js",
			"imports": ["/assets/jsx-runtime-WgHwu3Oc.js", "/assets/preload-helper-CZgWQFsJ.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/documentation/$": {
			"id": "routes/documentation/$",
			"parentId": "routes/_layout",
			"path": "documentation/*",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/_-CLI07CBh.js",
			"imports": ["/assets/jsx-runtime-WgHwu3Oc.js", "/assets/error-boundary-D0jX8Rjr.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/llms.txt": {
			"id": "routes/llms.txt",
			"parentId": "routes/_layout",
			"path": "llms.txt",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/llms.txt-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-61475580.js",
	"version": "61475580",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = { "unstable_optimizeDeps": false };
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/_layout": {
		id: "routes/_layout",
		parentId: "root",
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: _layout_exports
	},
	"routes/$": {
		id: "routes/$",
		parentId: "routes/_layout",
		path: "*",
		index: void 0,
		caseSensitive: void 0,
		module: $_exports$1
	},
	"routes/_index": {
		id: "routes/_index",
		parentId: "routes/_layout",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: _index_exports
	},
	"routes/documentation/$": {
		id: "routes/documentation/$",
		parentId: "routes/_layout",
		path: "documentation/*",
		index: void 0,
		caseSensitive: void 0,
		module: $_exports
	},
	"routes/llms.txt": {
		id: "routes/llms.txt",
		parentId: "routes/_layout",
		path: "llms.txt",
		index: void 0,
		caseSensitive: void 0,
		module: llms_txt_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
