"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const logger = __importStar(require("./5w-logger"));
describe('Logger', () => {
    // TODO: add mockups
    it('without span', () => {
        describe('debug works', () => {
            logger.debug('test', 'message', logger.LogGroup.Technical);
        });
        describe('warn works', () => {
            logger.warn('test', 'message', logger.LogGroup.Technical, 'user', { foo: 'bar' });
        });
        describe('info works', () => {
            logger.info('test', 'message', logger.LogGroup.Technical, 'user', { foo: 'bar' });
        });
        describe('error works', () => {
            logger.error('test', 'message', logger.LogGroup.Technical, 'user');
        });
        describe('circular reference works', () => {
            const circular = {
                foo: 'bar',
                itself: {}
            };
            circular.itself = circular;
            logger.error('test', 'message', logger.LogGroup.Technical, 'user', circular);
        });
    });
    it('with span', () => {
        describe('debug works', () => {
            const span = new logger.LogSpan('fake-id');
            span.debug('test', 'message');
        });
        describe('warn works', () => {
            const span = new logger.LogSpan('fake-id');
            span.warn('test', 'message', logger.LogGroup.Session, 'user', { foo: 'bar' });
        });
        describe('info works', () => {
            const span = new logger.LogSpan('fake-id');
            span.info('test', 'message', logger.LogGroup.Session, 'user');
        });
        describe('error works', () => {
            const span = new logger.LogSpan('fake-id');
            span.error('test', 'message', logger.LogGroup.Session);
        });
    });
    describe('with', () => {
        it('Error meta', () => {
            const span = new logger.LogSpan('fake-id');
            try {
                throw new Error('Error');
            }
            catch (e) {
                span.error('test', 'message', logger.LogGroup.Technical, undefined, e);
            }
        });
        it('object meta', () => {
            const span = new logger.LogSpan('fake-id');
            span.error('test', 'message', logger.LogGroup.Technical, undefined, {
                metaKey: {
                    metaValue: 'test'
                }
            });
        });
        it('string meta', () => {
            const span = new logger.LogSpan('fake-id');
            span.error('test', 'message', logger.LogGroup.Technical, undefined, 'string-meta');
        });
    });
});
//# sourceMappingURL=5w-logger.spec.js.map