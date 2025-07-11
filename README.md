node v22.14.0

# Enunciado del TP

https://docs.google.com/document/d/1K0WJdOpcng4Jy-1PgIMz7CTtACT4HPSiiFB3IuM3l3o/edit?tab=t.0#heading=h.zho8hjgki4ue

# Sobre typescript
- https://www.typescriptlang.org/docs/
- https://lasse-skaalum.medium.com/migrating-a-javascript-node-js-project-to-typescript-step-by-step-guide-8279b065d4e
- https://www.typescriptlang.org/download/
- https://nodejs.org/api/typescript.html#type-stripping
- https://jestjs.io/docs/ecmascript-modules
- https://eslint.org/docs/latest/use/configure/migration-guide
- https://github.com/prettier/eslint-plugin-prettier#options
- https://eslint.org/docs/latest/rules/
- https://eslint.org/docs/latest/rules/no-case-declarations
- https://nodejs.org/en/learn/typescript/run-natively

# Comandos importantes
- `npm run build` --> Compila los .ts a .js
- `npm run clean` --> Limpia el dist/
- `npm run start` --> Ejecuta la version compilada del index.ts
- `npm run dev` --> Corre el index.ts directamente; esto usamos nosotros, todos los anteriores son más para producción (automatizaciones de GitHub u otros servicios que van a ejecutar nuestro producto final)
- `npm test` --> Corre los tests con los *.test.js generados (en realidad debería correr los *.test.ts, pero por ahora dejémoslo así para ver cómo funca la compilación)

# Explicación del Git Flow:

https://medium.com/@yanminthwin/understanding-github-flow-and-git-flow-957bc6e12220&sa=D&source=editors&ust=1744917414774916&usg=AOvVaw3p1SF66uM-GUMNjsaf1PCh

El Git Flow cuenta con dos branches o ramas principales: la main y el develop. Aunque también estarán acompañadas de otras ramas auxiliares. A continuación explicaremos el propósito de cada rama:

- Rama main: releases productivos y estables

- Rama develop: para la integración de las features desarrolladas. Contienen código en progreso.

- Rama feature: Se originan de la rama develop, cuando se quieren agregar nuevas features o arreglar bugs.

- Rama release: para testear y arreglar bugs de un conjunto de features listos para entrar en producción. Esta rama se origina de una rama develop.

- Rama hotfix: para corregir rápidamente problemas críticos del código producción (que se encuentra en la rama main). Se originan de la rama main.

El beneficio que ofrece la forma de trabajo Git Flow es que diferentes equipos pueden trabajar simultáneamente en diferentes ramas feature. 

# Propuesta de Commits
Escribir commits **significativos** y **concisos** es clave para tener un historial de proyecto **limpio** y **comprensible**. Después de investigar sobre el tema, propongo utilizar los siguientes principios y reglas para crear **commits efectivos**:

## 1. Realizar cambios _pequeños_ y _lógicos_:
- **Ta bueno**: Agrupar cambios relacionados en un solo commit. Por ejemplo, implementar un componente/funcionalidad o corregir un error.

- **Ta mal**: Combinar cambios no relacionados en un solo commit.

**Ejemplo:**
```bash
# Bueno
git commit -m "feat(auth): agregar flujo de inicio de sesión con OAuth2"
# Malo
git commit -m "agregar inicio de sesión, arreglar pie de página, actualizar estilos"
```

## 2. Escribir mensajes claros:
Para mensajes más claros, propongo utilizar este formato para los commits:
```bash
<tipo>(<área>): <resumen corto>

<cuerpo (opcional): Explica qué/cómo/por qué>
```

**Ejemplo:**
```bash
feat(auth): agregar soporte para OAuth2

- Integrado Google OAuth2 para inicio de sesión
- Actualizado servicio de autenticación para validación de tokens
```

## 3. Usar convenciones comunes de commits: 
- **feat:** Introduce una nueva funcionalidad.

- **fix:** Corrige un error.

- **refactor:** Cambios en el código sin impactar la funcionalidad.

- **docs:** Actualizaciones en la documentación.
 
- **test:** Agrega o actualiza pruebas.
 
- **chore:** Actualizaciones en tareas de construcción o dependencias 

