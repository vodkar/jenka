
export interface BaseTaskParameter {
    name: string;
    defaultValue?: string;
    isRequired: boolean;
}
export interface TaskParameterEnum extends BaseTaskParameter {
    enumValues: string[];
}
export interface TaskParameter extends BaseTaskParameter {
    userDefinedType: 'string' | 'bool' | 'int' | 'float' | 'array' | 'map';
}

export interface Task {
    id: number;
    name: string;
    parameters: (TaskParameterEnum | TaskParameter)[];
    runHistory: TaskRun[];
}

export enum TaskRunStatus {
    RUNNING = 'running',
    SUCCESS = 'success',
    FAILED = 'failed',
}

export interface TaskRun {
    id: number;
    runNumber: number;
    output?: string;
    status: TaskRunStatus;
    startedAt: Date;
    finishedAt: Date;
    taskfileId: number;
    hasOutput?: boolean;
    progress: number;
    parameters?: Record<string, string>;
}

export function isEnumParameter(
    param: TaskParameterEnum | TaskParameter
): param is TaskParameterEnum {
    return 'enumValues' in param;
}

export const taskTypeToJsType = {
    string: "string",
    bool: "boolean",
    int: "number",
    float: "number",
    array: "string",
    map: "string",
}