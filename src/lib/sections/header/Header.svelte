<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { browser } from '$app/environment';

	import { clickOutsideNav } from '$lib/utils/actions';

	import Burger from './Burger.svelte';

	let open = false;
	let hasScolled = false;
	let scrollPosition: number = 0;

	// lifecycle
	afterNavigate(() => (open = false));
</script>

<svelte:window bind:scrollY={scrollPosition} />

<header
	class="header"
	class:accented={!browser && $page.url.pathname === '/'
		? true
		: browser && $page.url.pathname === '/' && scrollPosition < 60}
>
	<a href="/" class="header__logo">shindra david</a>
	<nav
		aria-label="Main navigation"
		class="header__nav"
		class:open
		use:clickOutsideNav
		on:click_outside_nav={() => (open = false)}
	>
		<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : 'false'}>Home</a>
		<a href="/portfolio" aria-current={$page.url.pathname === '/portfolio' ? 'page' : 'false'}>
			Portfolio
		</a>
		<a href="/contact" aria-current={$page.url.pathname === '/contact' ? 'page' : 'false'}>
			Contact
		</a>
		<a href="/FAQ" aria-current={$page.url.pathname === '/FAQ' ? 'page' : 'false'}>FAQ</a>
		<div class="divider" />
		<a href="/blog" aria-current={$page.url.pathname === '/blog' ? 'page' : 'false'}>Blog</a>
		<a href="/courses" aria-current={$page.url.pathname === '/courses' ? 'page' : 'false'}>
			Courses
		</a>
	</nav>

	<Burger {open} on:click={() => (open = !open)} />
</header>

<style lang="scss">
	@use 'sass:color';

	:global(body) {
		margin-top: $header-height;
	}
	.header.accented {
		--divider: #{color.adjust($gray-900, $alpha: -0.2)};
		color: var(--bg-primary);
		background-color: var(--accent-color);
		box-shadow: none;
	}
	.header {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: $layer-1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: $header-height;
		color: var(--txt-primary);
		background-color: var(--bg-secondary);
		box-shadow: $shadow-sm;
		@include page-lr-padding;

		&__logo {
			font-size: var(--fs-md);
			text-decoration: none;
			font-family: var(--ff-serif);
			color: inherit;
			font-weight: 700;
		}

		&__nav {
			position: absolute;
			top: $header-height;
			left: -100%;
			z-index: $layer-1;
			display: flex;
			flex-direction: column;
			height: calc(100vh - $header-height);
			width: 60vw;
			background-color: var(--bg-secondary);
			transition: left $animation-timing-400;
			padding-top: $spacing-md;
			@include page-lr-padding;

			@include screen-lg {
				position: static;
				width: fit-content;
				height: fit-content;
				flex-direction: row;
				gap: $spacing-md;
				background-color: inherit;
				padding: 0;
			}

			& > .divider {
				background-color: color.adjust($gray-200, $alpha: -0.2);
				width: 100%;
				height: 1px;
				margin: $spacing-md 0;

				@include screen-lg {
					height: 30px;
					width: 1px;
					margin: 0;
					background-color: var(--divider);
				}
			}

			&.open {
				left: 0;
			}

			a {
				font-size: var(--fs-lg);
				text-decoration: none;
				color: var(--txt-primary);
				font-family: var(--ff-serif);

				@include screen-lg {
					color: inherit;
					font-size: var(--fs-base);
				}
			}
		}
	}
</style>
