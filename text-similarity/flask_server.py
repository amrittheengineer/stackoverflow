from flask import Flask, Response, jsonify 
from flask_restplus import Api, Resource, fields, reqparse 
from flask_cors import CORS, cross_origin 
import os 
# the app 
app = Flask(__name__) 
CORS(app) 
api = Api(app, version='1.0', title='APIs for finding text similarity using Python ', validate=False) 
ns = api.namespace('similarity', 'Returns a similarity index of two sentences') 
# load the algo 
from similarity import app as algo 
''' We import our function `app` from the file similarity.py. You create all the classes and functions that you want in that file, and import them into the app. ''' 
# model the input data 
model_input = api.model('Sentences', { "text1": fields.String, "text2": fields.String})
# the input data type here is Integer. You can change this to whatever works for your app. 
# On Bluemix, get the port number from the environment variable PORT # When running this app on the local machine, default to 8080 
port = int(os.getenv('PORT', 8080)) 
# The ENDPOINT 
@ns.route('/similarity') 
# the endpoint 
class SIMILARITY(Resource): 
    @api.response(200, "Success", model_input)   
    @api.expect(model_input)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('text1', type=str)
        parser.add_argument('text2', type=str)
        args = parser.parse_args()
        inp1 = str(args["text1"])
        inp2 = str(args["text2"])
        result = algo(inp1, inp2)
        print(result)
        return jsonify({"similarity": result}) 
if __name__ == '__main__': 
    app.run(host='0.0.0.0', port=port, debug=False) # deploy with debug=False

@app.route('/similarity', methods = ['POST'])
def user(user_id):
    if request.method == 'POST':
        print(request)