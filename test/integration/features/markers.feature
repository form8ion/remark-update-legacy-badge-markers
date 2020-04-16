Feature: markers

  Scenario: legacy markers with no existing badges
    Given there are no existing badges
    And there is no section content
    And legacy badge markers exist
    When a node is processed
    Then modern badge zones are added

  Scenario: legacy markers with existing badges
    Given there are existing badges
    And there is no section content
    And legacy badge markers exist
    When a node is processed
    Then modern badge zones are added

  Scenario: legacy markers with no existing badges but other content exists
    Given there are no existing badges
    And there is existing section content
    And legacy badge markers exist
    When a node is processed
    Then modern badge zones are added

  @wip
  Scenario: modern zones with existing badges
    When a node is processed
