export const STYLES = [
  { name: "8starlabs-ui" as const, title: "8star Labs UI" },
] as const

export type Style = (typeof STYLES)[number]

export async function getActiveStyle() {
  return STYLES[0]
}

export function getStyle(name: string) {
  return STYLES.find((style) => style.name === name)
}
