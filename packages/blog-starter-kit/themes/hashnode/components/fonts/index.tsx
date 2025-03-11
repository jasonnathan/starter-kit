import { Spectral, Lora } from 'next/font/google';

const spectral = Spectral({
  subsets: ['latin'],
  variable: '--font-spectral',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const variableConstant = 'variable';
const fontSpectralVar = spectral.variable.replace(variableConstant, 'Spectral');
const fontLoraVar = lora.variable.replace(variableConstant, 'Lora');

export const GlobalFontVariables = () => (
  <style jsx global>{`
    html {
      --font-spectral: ${fontSpectralVar};
      --font-lora: ${fontLoraVar};
    }
  `}</style>
);
