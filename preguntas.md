
# Respuestas a las preguntas

## 1. Vue no detecta cambios dentro de objetos reactivos de la forma que esperarías. ¿Cómo podrías observar un cambio en una propiedad anidada?

Vue no es capaz de detectar cambios en propiedades anidadas de un objeto reactivo de manera automática, ya que solo observa las propiedades cuando son accesadas directamente. Para poder observar esos cambios en propiedades anidadas, la mejor opción es utilizar watch(), que nos permite escuchar una propiedad específica. Por ejemplo, si estamos trabajando con un array de productos y necesitamos detectar cambios en la propiedad stock, el siguiente código lograría actualizar automáticamente la propiedad disponible de cada producto:

```javascript
watch(
  () => productos.map(p => p.stock),
  (newStocks) => {
    newStocks.forEach((newStock, index) => {
      productos[index].disponible = newStock > 0;
    });
  }
);
```
Con esto, cada vez que el stock de algún producto cambie, Vue detectará el cambio y actualizará su disponibilidad en tiempo real.

## 2. `watch()` permite escuchar cambios en propiedades específicas dentro de `reactive()`. Explica cómo funciona.

El watch() en Vue es una herramienta súper útil que nos permite escuchar los cambios en propiedades específicas dentro de un objeto reactivo. En lugar de reaccionar a cualquier cambio en el objeto completo, se puede configurar para que solo reaccione cuando se modifican propiedades particulares. Esto es especialmente útil cuando queremos hacer algo cada vez que una propiedad cambia. Por ejemplo, si tenemos un par de propiedades como ganancias y gastos, y queremos recalcular los beneficios cada vez que alguna de ellas se modifique, podemos hacerlo de la siguiente manera:

```javascript
watch([ganancias, gastos], () => {
  beneficios.value = ganancias.value - gastos.value;
});
```
Así, cada vez que ganancias o gastos cambien, la función se ejecutará y recalculará el valor de beneficios.

## 3. ¿Cómo harías que un `watch()` detecte cambios en el stock dentro de un array de productos?

Cuando trabajamos con un array de productos y queremos detectar cambios en alguna de sus propiedades, como el stock, podemos utilizar watch() de manera que escuchemos esos cambios en cada elemento del array. En este caso, podemos observar los valores de stock a través de productos.map(p => p.stock), lo que nos permitirá reaccionar de forma reactiva a cualquier cambio. El código sería algo así:

```javascript
watch(
  () => productos.map(p => p.stock),
  (newStocks) => {
    newStocks.forEach((newStock, index) => {
      productos[index].disponible = newStock > 0;
    });
  }
);
```
Este fragmento asegura que, cuando el stock de un producto cambia, Vue actualiza automáticamente la propiedad disponible de ese producto, manteniendo todo el flujo reactivo sin necesidad de intervención adicional.