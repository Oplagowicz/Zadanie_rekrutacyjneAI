Opis Projektu
To jest aplikacja do przetwarzania tekstów przy użyciu OpenAI API. Program pobiera tekst z pliku article.txt, przekształca go na HTML za pomocą modelu GPT, oraz zapisuje wynik w pliku artykul.html.

Wymagania
Node.js: Musisz mieć zainstalowaną wersję Node.js (możesz pobrać z oficjalnej strony Node.js).
OpenAI API Key: Dodaj swój klucz API do pliku .env.
Instrukcja Instalacji
Sklonuj repozytorium:
git clone <URL_do_repozytorium>
cd <nazwa_folderu_repozytorium>

Utwórz plik .env w katalogu głównym projektu i dodaj swój klucz API:

OPENAI_API_KEY=twój_klucz_api
Zainstaluj zależności:

W katalogu projektu uruchom:

npm install
To polecenie zainstaluje wszystkie wymagane paczki (wymienione w package.json), w tym dotenv oraz axios.

Uruchomienie Aplikacji
Aby uruchomić aplikację, po prostu uruchom plik start.bat klikając dwukrotnie na plik lub wpisz:

start.bat
To polecenie uruchomi aplikację w konsoli. W trakcie działania zobaczysz komunikat „generacja idzie. Podajcie kilka minut”.

Struktura Plików
app.js: Główny skrypt aplikacji.
article.txt: Plik tekstowy z artykułem, który będzie przetwarzany.
artykul.html: Wynikowy plik HTML, generowany przez aplikację.
start.bat: Skrypt uruchamiający aplikację.

Notatka
Nie załączamy katalogu node_modules w repozytorium. Po sklonowaniu repozytorium pamiętaj, aby wykonać npm install, aby pobrać wszystkie wymagane moduły Node.js.