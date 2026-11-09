# Koncepcja aplikacji dla fotografów i modeli

## Cel produktu

Aplikacja ma łączyć fotografów, modeli i modelki oraz inne osoby pracujące przy sesjach zdjęciowych. Ma ułatwiać znalezienie odpowiednich osób, prezentowanie własnych prac, nawiązywanie kontaktu i organizowanie wspólnych projektów.

Główna wartość: w jednym miejscu można pokazać swoje portfolio, odkryć osoby do współpracy i przejść od pierwszego kontaktu do zaplanowanej sesji.

## Dla kogo

- **Fotografowie** — prezentują zdjęcia i styl pracy, szukają modeli oraz współpracowników.
- **Modelki i modele** — publikują portfolio, opisują doświadczenie i znajdują fotografów oraz projekty.
- **Pozostali twórcy** — wizażyści, styliści, projektanci i osoby z ekip produkcyjnych mogą dołączać do zespołów i projektów.

## Główne funkcje

### 1. Profile i portfolio

- Profil użytkownika z imieniem lub nazwą, rolą, lokalizacją, krótkim opisem i danymi o doświadczeniu.
- Portfolio w formie galerii zdjęć, z możliwością dodania opisu, kategorii i informacji o autorach zdjęć.
- Dla modeli: opcjonalne informacje przydatne przy współpracy, np. wzrost, zakres doświadczenia i rodzaj sesji.
- Dla fotografów: opis specjalizacji, stylu, dostępnego sprzętu lub warunków pracy.
- Ustawienia widoczności i możliwość aktualizowania oraz usuwania własnych materiałów.

### 2. Odkrywanie i wyszukiwanie osób

- Przeglądanie profili fotografów, modeli i innych twórców.
- Wyszukiwanie i filtrowanie m.in. według roli, lokalizacji, rodzaju fotografii, doświadczenia i dostępności.
- Karty profili prowadzące do portfolio i opcji kontaktu.
- Sekcja inspiracji z pomysłami na klimat lub temat sesji; użytkownicy mogą zapisać pomysł albo oznaczyć, że im się podoba.

### 3. Wiadomości i kontakt

- Prywatne rozmowy między użytkownikami.
- Wysłanie wiadomości z profilu, by zaproponować współpracę lub dopytać o szczegóły.
- Powiadomienia o nowych wiadomościach i zaproszeniach.
- Możliwość zgłoszenia nieodpowiedniej wiadomości lub profilu.

### 4. Sesje i projekty

- Utworzenie projektu z nazwą, opisem, pomysłem na sesję, lokalizacją, terminem i poszukiwanymi rolami.
- Zapraszanie osób do zespołu oraz przeglądanie zgłoszeń.
- Wspólna przestrzeń projektu z listą uczestników, podstawowymi ustaleniami i czatem grupowym.
- Status projektu, np. „szukamy ekipy”, „zaplanowany” lub „zakończony”.

## Podstawowa ścieżka użytkownika

1. Użytkownik rejestruje się i wybiera rolę lub role, które go opisują.
2. Uzupełnia profil i dodaje przykłady prac do portfolio.
3. Wyszukuje osoby albo przegląda inspiracje i projekty.
4. Kontaktuje się z wybraną osobą lub zgłasza chęć udziału w projekcie.
5. Uzgadnia szczegóły w rozmowie, a następnie organizuje sesję w przestrzeni projektu.
6. Po sesji aktualizuje portfolio i może oznaczyć współpracowników przy opublikowanych pracach.

## Plan realizacji

### Etap 1 — zakres MVP

- Ustalić podstawowe role, wymagane pola profilu i zasady publikowania zdjęć.
- Zbudować rejestrację, logowanie i edycję profilu.
- Dodać portfolio: dodawanie, przeglądanie i usuwanie zdjęć.
- Udostępnić katalog profili z wyszukiwaniem po roli i lokalizacji.
- Dodać prywatne wiadomości.

### Etap 2 — współpraca

- Dodać tworzenie projektów sesji, zaproszenia i zgłoszenia.
- Dodać uczestników projektu oraz czat grupowy.
- Wprowadzić powiadomienia o wiadomościach i zmianach w projekcie.

### Etap 3 — odkrywanie i rozwój

- Dodać inspiracje sesyjne, zapisywanie pomysłów i reakcje.
- Rozszerzyć filtry wyszukiwania i preferencje dostępności.
- Zebrać opinie użytkowników i na ich podstawie ustalić kolejne funkcje.

## Stan prototypu

- Dostępny jest katalog przykładowych profili z wyszukiwaniem, filtrowaniem ról, zapisywaniem ulubionych i podglądem profilu.
- Dostępna jest tablica przykładowych sesji z filtrowaniem po mieście i poszukiwanej roli oraz formularzem tworzenia ogłoszenia.
- Profile i ogłoszenia są na razie demonstracyjne, a własne zapisane elementy trafiają do pamięci przeglądarki. Nie ma jeszcze kont użytkowników ani wspólnej bazy danych, więc ogłoszenie nie jest widoczne na innych urządzeniach.
- Następnym krokiem przed prawdziwym uruchomieniem współpracy jest backend z kontami, trwałym zapisem profili i projektów oraz możliwością zgłoszenia zainteresowania lub napisania do autora.

## Ważne wymagania produktu

- Portfolio i profile powinny dobrze prezentować się na telefonie i komputerze.
- Użytkownik kontroluje, jakie informacje i zdjęcia publikuje.
- Przy zdjęciach należy jasno wskazywać autora i uzgodnić zasady publikacji oraz oznaczania osób.
- Wyszukiwanie powinno pozwalać szybko znaleźć osoby pasujące do rodzaju i miejsca sesji.
- Kontakt oraz udział w projekcie powinny wymagać świadomej akcji użytkownika.
- Aplikacja powinna zapewnić podstawowe narzędzia do zgłaszania nadużyć i blokowania użytkowników.

## Poza zakresem pierwszej wersji

Na początek nie trzeba budować płatności, rozbudowanego systemu rezerwacji, umów elektronicznych ani automatycznych rekomendacji. Najpierw należy sprawdzić, czy użytkownicy uzupełniają portfolio, znajdują właściwe osoby i skutecznie umawiają współpracę.

## Otwarte decyzje

- Czy rejestracja ma być dostępna tylko dla osób pełnoletnich?
- Czy użytkownik może mieć kilka ról jednocześnie?
- Czy projekty mają być publiczne, prywatne, czy oba warianty?
- Jakie zdjęcia i informacje wymagają moderacji przed publikacją?
- Czy aplikacja ma działać lokalnie w jednym kraju/regionie na start?
