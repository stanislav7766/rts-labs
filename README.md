Частина лабораторних робіт(1.1-2.2) з курсу систем реального часу <br/>
Варіант - 24 <br />

За бажанням можно перевірити виконання роботи 2 шляхами: <br />

1. Відвідати https://client-one.now.sh/
2. Зклонити репу(повинен бути встановлений yarn) && перейти до кореню директорії && yarn install && yarn start<br />

у формах вказуйте наступні дані(або за іншим варіантом): <br />
W - 2100 <br />
n - 6 <br />
N - 256 <br />

Статус робіт: <br/>
1.1 Доп. завдання отримано. Перевірено.<br/>
1.2 Доп. завдання отримано. Перевірено.<br/>
2.1 Доп. завдання отримано. Реалізувати "табличний" метод (запис WpkN у таблицю) (за комітами можна подивитись зміни). Поки не перевірено.<br/>
2.2 Доп. завдання поки не отримано. Не перевірено.<br/>

Щодо 2.1 (Дискретне Перетворення Фур'є)<br/>
алгоритм знаходиться у rts-labs/src/utils/mathFunctions.js -> calcDft<br/>
Графіки:<br/>
![Optional Text](../master/graphics/21/21-real-dft.jpg)
![Optional Text](../master/graphics/21/21-imagine-dft.jpg)
![Optional Text](../master/graphics/21/21-spectrum-dft.jpg)

Щодо 2.2 (Швидке Перетворення Фур'є)<br/>
алгоритм знаходиться у rts-labs/src/utils/mathFunctions.js -> calcFft<br/>
Графіки:<br/>
![Optional Text](../master/graphics/22/22-real-fft.jpg)
![Optional Text](../master/graphics/22/22-imagine-fft.jpg)
![Optional Text](../master/graphics/22/22-spectrum-fft.jpg)
