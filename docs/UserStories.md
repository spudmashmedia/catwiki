# Cat Wiki - User Stories
- [Cat Wiki - User Stories](#cat-wiki---user-stories)
- [User Stories](#user-stories)
  - [US01: As a user, I can search cat breeds from the homepage so I can select a breed of my choice.](#us01-as-a-user-i-can-search-cat-breeds-from-the-homepage-so-i-can-select-a-breed-of-my-choice)
    - [Acceptance Criteria](#acceptance-criteria)
  - [US02: As a user, when I select a breed, I want the ability to see more photos of the same breed.](#us02-as-a-user-when-i-select-a-breed-i-want-the-ability-to-see-more-photos-of-the-same-breed)
    - [Acceptance Criteria](#acceptance-criteria-1)
  - [US03: As a user, when I select a breed, I want the ability to view more details about the same breed.](#us03-as-a-user-when-i-select-a-breed-i-want-the-ability-to-view-more-details-about-the-same-breed)
    - [Acceptance Criteria](#acceptance-criteria-2)
  - [US04: As a user, I want to see the 10 most searched for cat breeds on the homepage to help me decide which breed to view.](#us04-as-a-user-i-want-to-see-the-10-most-searched-for-cat-breeds-on-the-homepage-to-help-me-decide-which-breed-to-view)
    - [Acceptance Criteria](#acceptance-criteria-3)

---

# User Stories

## US01: As a user, I can search cat breeds from the homepage so I can select a breed of my choice.

### Acceptance Criteria

- the homepage should contain a search box that will filter breeds when the user types
- the results should be listed on the same page, with each result item displayed in a card:
  - breed name
  - image
  - country of origin
  - statistics (should be minimal to fit in a results card).
- When the results card is clicked, it should navigate to the details page.


---

## US02: As a user, when I select a breed, I want the ability to see more photos of the same breed.

### Acceptance Criteria

- the details page should show a list of images relating to the breed

---

## US03: As a user, when I select a breed, I want the ability to view more details about the same breed.

### Acceptance Criteria

- the details page should show statistics and details of the breed:
  - description
  - temperament
  - origin
  - life span
  - adaptability
  - affection level
  - child-friendly
  - grooming
  - intelligence
  - health issues
  - social needs
  - stranger friendly

---

## US04: As a user, I want to see the 10 most searched for cat breeds on the homepage to help me decide which breed to view.

### Acceptance Criteria

- a widget should display a list of the top 10 selected breeds on the homepage
- for the sake of simplicity for this exercise, the state will be stored client side (NOTE: this should be persisted to a System or Record - NoSQL/RelationalDB)

---


