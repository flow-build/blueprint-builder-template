Feature: Blueprints has all nodes
    Checks if a blueprint is missing nodes

    Scenario: Blueprint do not have all nodes
        Given blueprint is exported
        When i read its nodes
        Then i see there is some nodes missing