declare module 'director/build/director' {
	export interface Router {
		init(): this
		getRoute(index: number): string
		on(route: string | RegExp, handler: (...args: string[]) => void): void
	}

	export let Router: { new(): Router }
}
