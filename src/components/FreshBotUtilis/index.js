const FRESH_BOT_SCRIPT_ID = 'spd-busns-spt'
const FRESH_BOT_SRC =
  'https://cdn.in-freshbots.ai/assets/share/js/freshbots.min.js'
const CLIENT = '2088b651f2740c3c84f01040b85bf6f232a2d023'
const FRESH_BOT_DATA_HASH = 'ec4731742c263c2bc195d222fe724fe0049d9c05'

const loadFreshBotScript = (openWidget?) => {
  if (!document.getElementById(FRESH_BOT_SCRIPT_ID)) {
    let scriptElement = document.getElementsByTagName('script')[0],
      script = document.createElement('script')
    let loaded = false
    script.id = FRESH_BOT_SCRIPT_ID
    script.async = true
    script.setAttribute('data-self-init', 'false')
    script.setAttribute('data-init-type', 'opt')
    script.src = FRESH_BOT_SRC
    script.setAttribute('data-client', CLIENT)
    script.setAttribute('data-bot-hash', FRESH_BOT_DATA_HASH)
    script.setAttribute('data-env', 'prod')
    script.setAttribute('data-region', 'in')

    if (openWidget) {
      script.onreadystatechange = script.onload = function () {
        if (!loaded) {
          openWidget()
        }
        loaded = true
      }
    }

    scriptElement.parentNode?.insertBefore(script, scriptElement)
  }
}

export default loadFreshBotScript
