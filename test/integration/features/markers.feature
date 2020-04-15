Feature: markers

  Scenario: legacy markers with no existing badges
    Given legacy badge markers exist
    And there are no existing badges
    When a node is processed
    Then modern badge zones are added

  @wip
  Scenario: legacy markers with existing badges
    When a node is processed

  @wip
  Scenario: modern zones with existing badges
    When a node is processed
