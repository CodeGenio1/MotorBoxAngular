
    export interface Requirement {
        viewers: any[];
        _id: string;
        bodyStyle: string;
        carAge: string;
        color: string;
        capacity: string;
        engineSize: string;
        fuelType: string;
        make: string;
        model: string;
        year: number;
        noOfSeats?: number;
        noOfDoors?: number;
        preferences: string;
        performance: string;
        noOfViews: number;
        updatedDate: Date;
        createdDate: Date;
        collapse:Boolean;
    }

    export interface RequirementViewModel {
        user: string;
        imageUrl: string;
        requirements: Requirement[];
    }



