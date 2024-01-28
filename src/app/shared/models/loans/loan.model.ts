export interface LoanModel {
    id?: string;
    who: string;
    elements: LoanPositionModel[];
}

export interface LoanPositionModel {
    isLoan: boolean;
    value: number;
    description?: string;
}