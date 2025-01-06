import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
 
export const runtime = 'edge';
 
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const episodes = searchParams.get('episodes') ?? '24';
    const weeklyEpisodes = searchParams.get('weeklyEpisodes') ?? '5';
    const listenTime = parseInt(searchParams.get('listenTime') ?? '1440');
    const readTime = parseInt(searchParams.get('readTime') ?? '360');
    
    const formatTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}ч ${mins}м`;
    };

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)',
            padding: '40px',
            color: 'white',
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>
            Ваша статистика
          </div>
          
          <div style={{ fontSize: 20, color: '#93C5FD', marginBottom: 40 }}>
            Пробный период
          </div>

          <div style={{ width: '100%', marginBottom: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 5 }}>
              📚 {episodes} эпизодов получено
            </div>
            <div style={{ fontSize: 18, color: '#93C5FD', marginLeft: 20 }}>
              За последние 7 дней: {weeklyEpisodes}
            </div>
          </div>

          <div style={{ width: '100%', marginBottom: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 5 }}>
              ⏱ {formatTime(listenTime)} → {formatTime(readTime)}
            </div>
            <div style={{ fontSize: 18, color: '#93C5FD', marginLeft: 20 }}>
              Время прослушивания → Время чтения
            </div>
          </div>

          <div style={{ width: '100%', marginBottom: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 5 }}>
              ✨ {formatTime(listenTime - readTime)} сэкономлено
            </div>
            <div style={{ fontSize: 18, color: '#93C5FD', marginLeft: 20 }}>
              Ваше сохранённое время
            </div>
          </div>

          <div style={{ marginTop: 'auto', fontSize: 18, color: '#93C5FD' }}>
            Хотите продолжить экономить время?
          </div>
        </div>
      ),
      {
        width: 600,
        height: 400,
      },
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}