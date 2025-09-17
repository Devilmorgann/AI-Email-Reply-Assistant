package com.email.email_writer.app;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping ("/api/email")
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")



public class EmailGeneratorController {

    private  final  EmailGeneratorService emailGeneratorService;



    @PostMapping ("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return  ResponseEntity.ok(response);
    }
}
