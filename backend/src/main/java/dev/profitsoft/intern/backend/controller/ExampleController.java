package dev.profitsoft.intern.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin
@RequestMapping("/math/examples")
public class ExampleController {

    private final Random random = new Random();

    @GetMapping
    public List<String> getExamples(@RequestParam(name = "count", defaultValue = "5") String count) {
        List<String> examples = new ArrayList<>();
        for (int i = 0; i < Integer.parseInt(count); i++) {
            examples.add(generateExample());
        }
        return examples;
    }

    private String generateExample() {
        return generateOperand() + generateOperator() + generateOperand();
    }

    private int generateOperand() {
        return random.nextInt(0, 20);
    }

    private String generateOperator() {
        String[] operators = {"+", "-", "*", "/"};
        return operators[random.nextInt(0, operators.length)];
    }

}
