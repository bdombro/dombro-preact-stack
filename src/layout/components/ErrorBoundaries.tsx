import { ComponentChildren, Fragment as F, h } from 'preact'
import { useEffect, useErrorBoundary, useState } from 'preact/hooks'

/**
 * Catch Promise Rejection Errors
 * Place this component once, at the top of your app
 */
export function UnhandledErrorNotification() {
	const [promiseErrorEvent, setPromiseErrorEvent] = useState<any>(null)
	useEffect(listenForPromiseErrors, [])
	return promiseErrorEvent ? ErrorJsx : <F />

	function listenForPromiseErrors() {
		window.addEventListener('unhandledrejection', handleReject)
		return () => window.removeEventListener('unhandledrejection', handleReject)

		function handleReject(eventNext: any) {
			setPromiseErrorEvent(eventNext)
			// TODO: Log the error somewhere
		}
	}
}

/**
 * Catch runtime/synchronous errors
 * Wrap Components in this to catch the errors near the Component
 * Note: It cannot detect/catch promise rejections.
 */
export function ErrorBoundary({children}: {children: ComponentChildren}) {
	const [runtimeError] = useErrorBoundary()
	useEffect(reportRuntimeError, [runtimeError])
	return <F>{children}{runtimeError ? ErrorJsx : ''}</F>
	function reportRuntimeError() {
		if (runtimeError) {
			console.error(runtimeError)
			// TODO: Log the error somewhere
		}
	}
}

const ErrorJsx = (
	<div style={{position:'absolute',bottom:0,left:0,width:'100%',textAlign:'center',zIndex:100}}>
		<div style={{padding:20,backgroundColor:'var(--primary)',display:'inline-block',color:'#fff'}}>
			Something went wrong on this page! Shoot. Maybe&nbsp;
			<a style={{color:'hsl(var(--primary-h),var(--primary-s),88%',textDecoration:'underline'}} href="javascript:location.reload()">refresh</a>?
		</div>
	</div>
)