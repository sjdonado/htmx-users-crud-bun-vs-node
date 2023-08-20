The main logic is in the `OfferValidationPipe`.

1. Given an input Object, it will recursively search for a valid nested `Offer`.
2. Found an `Offer` type object (pointed by a key: offer, Offer, offers), it will be mapped by provider (separated mappers for each one).
3. If no validationErrors are found, it will be returned as `OfferDTO`.
4. The function returns an array to cover both cases: `[singleOffer]`, `[...multipleOffers]`.

Tests results

```bash
yarn run v1.22.19
$ jest
 PASS  src/offers/offers.service.spec.ts
 PASS  test/integration/offers.service.spec.ts
 PASS  src/offers/pipes/offer-validation.pipe.spec.ts
 PASS  src/app.controller.spec.ts

Test Suites: 4 passed, 4 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        1.239 s
Ran all test suites.
[Nest] 34607  - 08/20/2023, 10:46:45 PM    WARN [OfferValidationPipe1] Skipping offer due to validation error
✨  Done in 1.83s.
```
