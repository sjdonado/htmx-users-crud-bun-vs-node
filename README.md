> ![image](https://github.com/sjdonado/nestjs-htmx-users-crud/assets/27580836/b8e25bfb-1dba-4dca-96b4-e3e049128a20)

## Benchmarks
Output of `./benchmarks.sh` (MacBook Air M2 8GB):
```bash
NUM_REQUESTS=1000
CONCURRENCY=10
# htmx endpoints only
ENDPOINT_1="users/views/create"
ENDPOINT_2="users/views/edit/10"
ENDPOINT_3="users/views/cancel/edit/10"
```
```bash
Performance Comparison Report:
-----------------------------
nest-swc-handlebars Requests per Second (RPS): 553.87
1097.37
1229.77
565.90
1111.90
1291.70
885.05
407.41
1016.42
600.16
1318.79
1459.36
606.57
1344.69
1413.58
hono-bun-jsx Requests per Second (RPS): 1504.64
1358.62
1345.37
2137.22
1929.00
1327.29
2628.52
1786.38
2230.37
1372.89
2546.93
1796.54
1844.09
-----------------------------
Winner: hono-bun-jsx
-----------------------------
```

## Up and running
(a list of 300 items without lag, email inline validation, create user modal, edit rows, form validations, etc)

### Hono + Bun: https://hono-bun-htmx-users-crud.donado.co
<img width="1400" alt="image" src="https://github.com/sjdonado/nestjs-htmx-users-crud/assets/27580836/d135ff04-17bb-47f9-8cbf-858567117dc3">

### Nest + SWC: https://nest-swc-htmx-users-crud.donado.co
<img width="1400" alt="image" src="https://github.com/sjdonado/nestjs-htmx-users-crud/assets/27580836/a437c66b-e455-4254-acde-0b5899a65127">

---
Inspiration: https://www.youtube.com/watch?v=3GObi93tjZI
