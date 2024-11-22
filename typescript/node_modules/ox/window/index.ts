import type { Provider } from '../core/Provider.js'

declare global {
  interface Window {
    ethereum?: Provider | undefined
  }
}
