import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Sarah Dawson - Portfolio';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    // Font loading (using fetch for example font)
    const fontData = await fetch(
        new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 60,
                    background: '#080808',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#EAEAEA',
                    fontFamily: '"Inter"',
                    border: '20px solid #1a1a1a',
                }}
            >
                <div style={{
                    fontSize: 120,
                    backgroundImage: 'linear-gradient(to bottom right, #EAEAEA, #666666)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 800,
                    marginBottom: 20,
                }}>
                    SJ
                </div>
                <div style={{ fontSize: 40, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666' }}>
                    Sarah Dawson
                </div>
                <div style={{ fontSize: 24, marginTop: 40, color: '#FF3B30' }}>
                    Brand Strategy & Digital Direction
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Inter',
                    data: fontData,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    );
}
