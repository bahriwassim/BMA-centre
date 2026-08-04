import type { Config } from 'tailwindcss';
export default { content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme:{extend:{colors:{ink:'#111111',gold:'#D4AF37',cream:'#F8F8F8',mist:'#B9B9B9'},borderRadius:{'4xl':'2rem'},fontFamily:{sans:['Arial','sans-serif']}}},plugins:[] } satisfies Config;
