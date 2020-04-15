Feature: markers

  Scenario: legacy markers with no existing badges
    Given there are no existing badges
    And legacy badge markers exist
    When a node is processed
    Then modern badge zones are added

  Scenario: legacy markers with existing badges
    Given there are existing badges
    And legacy badge markers exist
    When a node is processed
    Then modern badge zones are added

  @wip
  Scenario: legacy markers with no existing badges but other content exists
    Given there are no existing badges
    And legacy badge markers exist
    When a node is processed
    Then modern badge zones are added

  @wip
  Scenario: modern zones with existing badges
    When a node is processed
