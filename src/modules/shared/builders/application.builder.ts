import { Injectable } from '@angular/core';
import { Application } from '@shared/models/_index';



@Injectable()
export class ApplicationBuilder {

    constructor() { }

    public build(props): Application {
        return this.toApplication(props);
    }

    private toApplication(props): Application {
        let application = new Application({
            id: props['id'],
            name: props['name'],
            executionGraph: props['executionGraph'],
            kafkaStreaming: props['kafkaStreaming'],
        });

        return application;
    }

}