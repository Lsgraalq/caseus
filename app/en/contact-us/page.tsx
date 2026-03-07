import Script from 'next/script';

export default function ClientRegistrationPage() {
  return (
    // Обертка заменяет твои стили html { margin: 0; height: 100%; overflow: hidden; }
    <main className="relative w-screen h-screen overflow-hidden bg-white m-0">
      
      {/* В Next.js внешние скрипты нужно подключать через специальный компонент Script.
        strategy="lazyOnload" загрузит его не блокируя остальной сайт.
      */}
      <Script 
        src="https://tally.so/widgets/embed.js" 
        strategy="lazyOnload" 
      />

      {/* Сам айфрейм формы. 
        Обрати внимание на camelCase: frameBorder, marginHeight, marginWidth.
        Классы Tailwind заменяют инлайновый стиль позиционирования.
      */}
      <iframe
        data-tally-src="https://tally.so/r/QKr78k?transparentBackground=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Client Registration Form"
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full border-0"
      />
      
    </main>
  );
}