export const devEnableDebug = (options) => {
	// #ifdef MP
	if (process.env.NODE_ENV === 'development') {
		// 打开调试
		uni.setEnableDebug({
			enableDebug: options.query?.isDebugger === '1'
		})
	}

	// #endif
}
