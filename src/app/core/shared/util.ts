export function groupBy2(xs: any[], key: string) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function round(value: number, precision: number): number {
  const multiplier = Math.pow(10, precision || 0);
  const x = Math.round(value * multiplier) / multiplier;
  return isNaN(x) ? 0 : x;
}

export function floor(value: number, precision: number): number {
  const multiplier = Math.pow(10, precision || 0);
  const x = Math.floor(value * multiplier) / multiplier;
  return isNaN(x) ? 0 : x;
}

export function ceil(value: number, precision: number): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.ceil(value * multiplier) / multiplier;
}

export function getPathLang(languages: readonly  string[]): string | null {
  const path = window.location.pathname;
  const firstPart = path.split('/').filter(Boolean)[0] || '/';
  return firstPart?.length === 2 && languages.includes(firstPart.toLowerCase()) ? firstPart.toLowerCase() : null;
}
